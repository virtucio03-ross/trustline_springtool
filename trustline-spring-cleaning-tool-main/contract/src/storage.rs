use soroban_sdk::{contracttype, Address, Env, String};

#[derive(Clone)]
#[contracttype]
pub struct Config {
    pub admin: Address,
    pub asset: Address,
    pub project_name: String,
}

#[derive(Clone)]
#[contracttype]
pub struct WorkflowRecord {
    pub owner: Address,
    pub target_amount: i128,
    pub released_amount: i128,
    pub status: String,
    pub score: u32,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Config,
    Record(String),
    TotalLocked,
}

pub fn read_config(env: &Env) -> Option<Config> {
    env.storage().instance().get(&DataKey::Config)
}

pub fn write_config(env: &Env, config: &Config) {
    env.storage().instance().set(&DataKey::Config, config);
}

pub fn read_record(env: &Env, id: &String) -> Option<WorkflowRecord> {
    env.storage().persistent().get(&DataKey::Record(id.clone()))
}

pub fn write_record(env: &Env, id: &String, record: &WorkflowRecord) {
    env.storage().persistent().set(&DataKey::Record(id.clone()), record);
    let current: i128 = env.storage().persistent().get(&DataKey::TotalLocked).unwrap_or(0);
    env.storage().persistent().set(&DataKey::TotalLocked, &(current + record.released_amount));
}
