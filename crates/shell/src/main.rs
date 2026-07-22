//! Thin glue layer. This should stay small enough to review at a
//! glance and obviously free of business logic — it marshals input to
//! `core` and marshals the result back out, nothing more.

fn main() {
    let name = std::env::args().nth(1).unwrap_or_else(|| "world".into());
    println!("{}", core::greet(&name));
}
