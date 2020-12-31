# Emulator 8086 Web

Web interface for 8086 emulator https://github.com/YJDoc2/8086-Emulator

![Webverion GIF](./webversion.gif)

## Notes

This does not have a 'True' memory, in sense that the instructions are not stored in memory. This allows complete 1 MB to be accessible to store the data, but does not allow jumps to memory positions, and Does not support ISRs, as ISR requires the code to be stored in memory as well.

## Building

To build install Rust and wasm-pack as instructed in https://rustwasm.github.io/docs/book/game-of-life/setup.html.

Note that there is know issue when allocating large size arrays , even on heap in rust :
https://github.com/rust-lang/rust/issues/53827
As we are using memory size of 1MB (maybe we should rethink that), and there are already some other objects on stack, this causes 'runtime error: index out of bounds' if compiled normally.
To overcome this, before compiling, add this to ~/.cargo/config (create config file if not present) :

```TOML
[target.wasm32-unknown-unknown]
rustflags = [
"-C", "link-args=-z stack-size=2000000",
]
```

This will allocate default stack size of ~2MB to the wasm, which seems to work fine
This is according to : https://github.com/rustwasm/wasm-pack/issues/479

We have tried to optimize stack usage by covering various structs in Box instead of allocating on stack, and manually calling std::mem::drop on them once their use is done, but that still causes same issue, so the only choice remaining was to increase the default allocated stack size.

After adding above in config, run wasm-pack in root folder of this project, without any arguments, which should build the wasm package and create a folder named `pkg`.

After that change directory to the webapp folder, and run

```sh
npm install
```

which will install all dependencies and link the generated wasm package correctly to the React app.

After that one can run this by running

```sh
npm run start
```

which will start the development server on port 3000.

To compile to static html-css-js, run

```sh
npm run build
```

which will create the `build` folder, but **NOTE** that to run this one will require a simple server, which can correctly serve all the files with correct MIME type set. (We tried running this by simply using Live Server extension in VS Code, but it seemed that it set MIME type of all files to text/html, due to which they are not accepted by browsers).
