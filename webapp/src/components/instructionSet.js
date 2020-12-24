export const instruction_set = [{
	name: 'Arithmetic',
	instructions: [{
			opcode: 'ADD',
			name: 'Add',
			example: 'ADD AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.
				
				To write stuff on new line use tilde`,
			usage: ['ADD AX. 0105H', 'ADD BL, 0FH`']
		},
		{
			opcode: 'ADC',
			name: 'Add with carry',
			example: 'ADC AX ,BX',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.',
			usage: ['ADC AX. 0105H', 'ADC BL, 0FH`']
		},
		{
			opcode: 'SUB',
			name: 'Subtract',
			example: 'SUB AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`,
			usage: ['SUB AX. 0105H', 'SUB BL, 0FH`']
		},
		{
			opcode: 'SBB',
			name: 'Subtract with Borrow',
			example: 'SBB AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`,
			usage: ['SBB AX. 0105H', 'SBB BL, 0FH`']
		},
		{
			opcode: 'MUL',
			name: 'Unsigned Multiplication',
			example: 'MUL AX,BX',
			description: 'This instruction increases the contents of  the specified register or memory location by 1. All the condition code flags are affected except the carry flag. Immediate data cannot be operand of this instruction.'
		}, {
			opcode: 'IMUL',
			name: 'Signed Multiplication',
			example: 'IMUL AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`
		},
		{
			opcode: 'DIV',
			name: 'Unsigned Divison',
			example: 'DIV AX ,BX',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.'
		},
		{
			opcode: 'IDIV',
			name: 'Signed Divison',
			example: 'IDIV AX,BX',
			description: 'This instruction increases the contents of  the specified register or memory location by 1. All the condition code flags are affected except the carry flag. Immediate data cannot be operand of this instruction.'
		},
		{
			opcode: 'INC',
			name: 'Increment',
			example: 'INC AX',
			description: 'This instruction increases the contents of  the specified register or memory location by 1. All the condition code flags are affected except the carry flag. Immediate data cannot be operand of this instruction.'
		},
		{
			opcode: 'DEC',
			name: 'Decrement',
			example: 'DEC AX',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.'
		},
	]
}, {
	name: 'Data Transfer',
	instructions: [{
			opcode: 'MOV',
			name: 'Move',
			example: 'MOV AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`
		},
		{
			opcode: 'XCHG',
			name: 'Exchange',
			example: 'XCHG AX,BX',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.'
		},
		{
			opcode: 'LAHF',
			name: 'Load AH with Flag',
			example: 'LAHF',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.'
		},
		{
			opcode: 'SAHF',
			name: 'Store AH in Flag',
			example: 'SAHF',
			description: 'This instruction increases the contents of  the specified register or memory location by 1. All the condition code flags are affected except the carry flag. Immediate data cannot be operand of this instruction.'
		}
	]
}]