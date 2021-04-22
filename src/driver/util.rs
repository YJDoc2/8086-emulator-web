use lib8086::util::data_util::{get_byte_reg, ByteReg};
use lib8086::VM;
use lib8086::{get_flag_state, Flags};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct JSFlags {
    pub of: u8,
    pub df: u8,
    pub iflag: u8,
    pub tf: u8,
    pub sf: u8,
    pub zf: u8,
    pub af: u8,
    pub pf: u8,
    pub cf: u8,
}

#[wasm_bindgen]
pub struct JSReg {
    pub ah: u8,
    pub al: u8,
    pub bh: u8,
    pub bl: u8,
    pub ch: u8,
    pub cl: u8,
    pub dh: u8,
    pub dl: u8,
    pub si: u16,
    pub di: u16,
    pub bp: u16,
    pub sp: u16,
    pub ss: u16,
    pub ds: u16,
    pub es: u16,
}

pub fn get_flags(vm: &VM) -> JSFlags {
    JSFlags {
        of: get_flag_state(vm.arch.flag, Flags::OVERFLOW) as u8,
        df: get_flag_state(vm.arch.flag, Flags::DIRECTION) as u8,
        iflag: get_flag_state(vm.arch.flag, Flags::INTERRUPT) as u8,
        tf: get_flag_state(vm.arch.flag, Flags::TRAP) as u8,
        sf: get_flag_state(vm.arch.flag, Flags::SIGN) as u8,
        zf: get_flag_state(vm.arch.flag, Flags::ZERO) as u8,
        af: get_flag_state(vm.arch.flag, Flags::AUX_CARRY) as u8,
        pf: get_flag_state(vm.arch.flag, Flags::PARITY) as u8,
        cf: get_flag_state(vm.arch.flag, Flags::CARRY) as u8,
    }
}

pub fn get_reg(vm: &VM) -> JSReg {
    return JSReg {
        ah: get_byte_reg(vm, ByteReg::AH),
        al: get_byte_reg(vm, ByteReg::AL),
        bh: get_byte_reg(vm, ByteReg::BH),
        bl: get_byte_reg(vm, ByteReg::BL),
        ch: get_byte_reg(vm, ByteReg::CH),
        cl: get_byte_reg(vm, ByteReg::CL),
        dh: get_byte_reg(vm, ByteReg::DH),
        dl: get_byte_reg(vm, ByteReg::DL),
        si: vm.arch.si,
        di: vm.arch.di,
        bp: vm.arch.bp,
        sp: vm.arch.sp,
        ss: vm.arch.ss,
        ds: vm.arch.ds,
        es: vm.arch.es,
    };
}
