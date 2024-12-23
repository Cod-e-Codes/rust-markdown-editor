#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use pulldown_cmark::{html, Parser};
use tauri::Builder;

#[tauri::command]
fn parse_markdown(input: String) -> String {
    let parser = Parser::new(&input);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    html_output
}

fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![parse_markdown])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
