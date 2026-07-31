use super::*;
use soroban_sdk::{Address, Env, String};

#[test]
fn opens_and_updates_record() {
    let env = Env::default();
    let contract_id = env.register(TrustlineSpringCleaningToolContract, ());
    let client = TrustlineSpringCleaningToolContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let asset = Address::generate(&env);
    let owner = Address::generate(&env);

    env.mock_all_auths();
    client.initialize(&admin, &asset, &String::from_str(&env, "Trustline Spring Cleaning Tool"));
    client.open_record(&String::from_str(&env, "REC-001"), &owner, &1000);
    client.record_payments_record(&String::from_str(&env, "REC-001"), &owner, &250, &86);

    let record = client.get_record(&String::from_str(&env, "REC-001")).unwrap();
    assert_eq!(record.released_amount, 250);
    assert_eq!(record.score, 86);
}
