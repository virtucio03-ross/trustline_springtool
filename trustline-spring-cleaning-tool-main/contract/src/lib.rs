#![no_std]

mod errors;
mod events;
mod storage;

use errors::Error;
use soroban_sdk::{contract, contractimpl, Address, Env, String};
use storage::{read_config, read_record, write_config, write_record, Config, DataKey, WorkflowRecord};

#[contract]
pub struct TrustlineSpringCleaningToolContract;

#[contractimpl]
impl TrustlineSpringCleaningToolContract {
    pub fn initialize(env: Env, admin: Address, asset: Address, project_name: String) -> Result<(), Error> {
        if read_config(&env).is_some() {
            return Err(Error::AlreadyInitialized);
        }

        admin.require_auth();
        write_config(&env, &Config { admin: admin.clone(), asset, project_name: project_name.clone() });
        events::initialized(&env, admin, project_name);
        Ok(())
    }

    pub fn open_record(env: Env, id: String, owner: Address, target_amount: i128) -> Result<(), Error> {
        if target_amount <= 0 {
            return Err(Error::InvalidAmount);
        }
        if read_config(&env).is_none() {
            return Err(Error::NotInitialized);
        }
        if read_record(&env, &id).is_some() {
            return Err(Error::RecordExists);
        }

        owner.require_auth();
        let record = WorkflowRecord {
            owner: owner.clone(),
            target_amount,
            released_amount: 0,
            score: 0,
            status: String::from_str(&env, "OPEN"),
        };
        write_record(&env, &id, &record);
        events::record_opened(&env, id, owner, target_amount);
        Ok(())
    }

    pub fn record_payments_record(env: Env, id: String, actor: Address, amount: i128, score: u32) -> Result<(), Error> {
        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }

        actor.require_auth();
        let mut record = read_record(&env, &id).ok_or(Error::RecordMissing)?;
        record.released_amount += amount;
        record.score = score;
        record.status = String::from_str(&env, "ACTIVE");
        write_record(&env, &id, &record);
        events::record_updated(&env, id, actor, amount, score);
        Ok(())
    }

    pub fn mark_verified(env: Env, id: String, verifier: Address, status: String, score: u32) -> Result<(), Error> {
        verifier.require_auth();
        let mut record = read_record(&env, &id).ok_or(Error::RecordMissing)?;
        record.status = status.clone();
        record.score = score;
        write_record(&env, &id, &record);
        events::verified(&env, id, verifier, status, score);
        Ok(())
    }

    pub fn get_record(env: Env, id: String) -> Option<WorkflowRecord> {
        read_record(&env, &id)
    }

    pub fn total_locked(env: Env) -> i128 {
        env.storage().persistent().get(&DataKey::TotalLocked).unwrap_or(0)
    }
}

#[cfg(test)]
mod test;
