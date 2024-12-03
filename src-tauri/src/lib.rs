use std::sync::Mutex;
use tauri::State;
mod game;

struct AppState {
    game: Mutex<game::Game>,
}

#[tauri::command]
fn next_block(state: State<AppState>) -> game::Block {
    let mut game = state.game.lock().unwrap();
    game.next_block().clone()
}

#[tauri::command]
fn reset_game(state: State<AppState>) -> game::Block {
    let mut game = state.game.lock().unwrap();
    game.reset();
    game.next_block().clone()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let game = game::create_game();
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .manage(AppState {
            game: Mutex::new(game),
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![next_block, reset_game])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
