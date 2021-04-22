# Emulator 8086 Web

Web interface for 8086 emulator [https://yjdoc2.github.io/8086-emulator-web](https://yjdoc2.github.io/8086-emulator-web)

The core library of interpreter and Emulator written in Rust is at : [https://github.com/YJDoc2/8086-Emulator](https://github.com/YJDoc2/8086-Emulator)

![Webverion GIF](./webversion.gif)

We got the initial idea for the web interface from [https://schweigi.github.io/assembler-simulator/](https://schweigi.github.io/assembler-simulator/)

## Note

This is a Intel 8086 Emulator, providing a way to run programs written for 8086 assembly instruction set. This internally stores data in the emulated "memory" of 1 MB size, but the code is not compiled to binary or stored in memory. Assembly statements are executed using an interpreter, which operates on the memory and architecture (registers, flags etc.) to emulate execution of the program.

As this does not have a 'True' memory, this does not allow jumps to memory positions, and Does not support ISRs, as ISR requires the code to be stored in memory as well.

This also does not emulate external devices like storage, or co-processors, but allows almost all instructions that 8086 support.

Most of the assembly syntax is same as Intel assembly syntax, with few minor changes, which are documented under respective instructions in the instruction set page of website.

## Building

To build install Rust and wasm-pack as instructed in https://rustwasm.github.io/docs/book/game-of-life/setup.html.

Note that there is know issue when allocating large size arrays , even on heap in rust :
https://github.com/rust-lang/rust/issues/53827
As we are using memory size of 1MB (maybe we should rethink that), and there are already some other objects on stack, this causes 'runtime error: index out of bounds' if compiled normally.
To overcome this, before compiling, create a folder named `.cargo` in root directory, make a file named `config` and add this :

```TOML
[target.wasm32-unknown-unknown]
rustflags = [
"-C", "link-args=-z stack-size=2000000",
]
```

This will allocate default stack size of ~2MB to the wasm, which seems to work fine.
This is according to : https://github.com/rustwasm/wasm-pack/issues/479

We have tried to optimize stack usage by covering various structs in Box instead of allocating on stack, and manually calling std::mem::drop on them once their use is done, but that still causes same issue, so the only choice remaining was to increase the default allocated stack size.

After adding above in config, run `wasm-pack build` in root folder of this project, which should build the wasm package and create a folder named `pkg`.

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

## File Structure

```
.
├── src                 ->  the Rust code for the driver
    ├── driver          ->  code for the Web driver
    ├── util.rs         -> set up the panic hook for easier debugging
    └── lib.rs          -> lib file which re-exports driver struct ad public
├── webapp              -> Folder for React frontend
    ├── public          -> contain public images and inedx.html
    └── src             -> contains main source files for React
        ├── components  -> contains reusable components
        ├── images      -> contains images and icons used in website
        ├── pages       -> contains code of main pages of webapp
        └── themes      -> contains themes for the webapp
├── Cargo.toml          -> Cargo TOML file
├── README.md           -> This file
├── LICENSE-APACHE      -> Licence file
├── LICENCE-MIT         -> Licence file
├── syntax.md           -> file containing syntax for the assembler
└── .gitignore          -> gitignore file for the repository

```

---

## License

Licensed under either of

- Apache License, Version 2.0
  ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license
  ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

## Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be
dual licensed as above, without any additional terms or conditions.
