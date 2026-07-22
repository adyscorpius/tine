//! Pure domain logic. No UI, IPC, or HTTP framework dependency belongs
//! here — see docs/adr/0001-example-core-behind-thin-shell.md.
//!
//! Replace this with your project's real logic. The point being
//! demonstrated is that it's testable with `cargo test -p core` alone,
//! with no app, server, or browser running.

pub fn greet(name: &str) -> String {
    format!("hello, {name}")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greets_by_name() {
        assert_eq!(greet("world"), "hello, world");
    }
}
