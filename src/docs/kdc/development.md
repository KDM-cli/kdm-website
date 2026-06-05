---
title: Development
description: Information on how to build and contribute to KDC.
eyebrow: Development
order: 4
---

Learn how to build, test, and contribute to KDC.

## Build From Source

Requires the stable Rust toolchain.

```bash
git clone https://github.com/KDM-cli/kdc-cli.git
cd kdc-cli
cargo build --release
sudo mv target/release/kdc /usr/local/bin/
```

Common development commands:

```bash
cargo run
cargo run -- scan
cargo run -- menus
cargo run -- analysis
cargo run -- doctor
cargo test
```

## Implementation Notes

- KDC is currently versioned as `0.1.0` in `Cargo.toml`.
- The binary name is `kdc`.
- The CLI is implemented with `clap`.
- The terminal UI is implemented with `ratatui` and `crossterm`.
- KDC primarily works by wrapping existing local tools such as Docker, Docker Compose, `kubectl`, and Minikube.
