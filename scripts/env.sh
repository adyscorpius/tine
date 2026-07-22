#!/usr/bin/env bash
# Source this before using cargo/rustc if your toolchain lives outside
# the default PATH (e.g. a container-persistent install location that
# survives rebuilds). Adjust the path below to your actual setup, or
# delete this file if you don't need it.
#
#   source scripts/env.sh

RUST_TOOLCHAIN_DIR="${RUST_TOOLCHAIN_DIR:-$HOME/.cargo}"
if [ -d "$RUST_TOOLCHAIN_DIR/bin" ]; then
  export PATH="$RUST_TOOLCHAIN_DIR/bin:$PATH"
fi
