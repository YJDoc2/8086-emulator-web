# Emulator 8086 Web

Web interface for 8086 emulator https://github.com/YJDoc2/8086-Emulator

## Notes

This does not have a 'True' memory, in sense that the instructions are not stored in memory. This allows complete 1 MB to be accessible to store the data, but does not allow jumps to memory positions, and Does not support ISRs, as ISR requires the code to be stored in memory as well.

## Building

Note that there is know issue when allocating large size arrays , even on heap in rust :
https://github.com/rust-lang/rust/issues/53827
As we are using memory size of 1MB (maybe we should rethink that), and there are already some other objects on stack, this causes 'runtime error: index out of bounds' if compiled normally.
To overcome this, before compiling, add this to ~/.cargo/config file (create config file if not present) :
\[target.wasm32-unknown-unknown]
rustflags = [
"-C", "link-args=-z stack-size=2000000",
]
This will allocate default stack size of ~2MB to the wasm, which seems to work fine
This is according to : https://github.com/rustwasm/wasm-pack/issues/479

We have tried to optimize stack usage by covering various structs in Box instead of allocating on stack, and manually calling std::mem::drop on them once their use is done, but that still causes same issue, so the only choice remaining was to increase the default allocated stack size.
