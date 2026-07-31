use soroban_sdk::{symbol_short, Address, Env, String};

pub fn initialized(env: &Env, admin: Address, project_name: String) {
    env.events().publish((symbol_short!("init"), admin), project_name);
}

pub fn record_opened(env: &Env, id: String, owner: Address, target_amount: i128) {
    env.events().publish((symbol_short!("open"), owner), (id, target_amount));
}

pub fn record_updated(env: &Env, id: String, actor: Address, amount: i128, score: u32) {
    env.events().publish((symbol_short!("record"), actor), (id, amount, score));
}

pub fn verified(env: &Env, id: String, verifier: Address, status: String, score: u32) {
    env.events().publish((symbol_short!("verify"), verifier), (id, status, score));
}
