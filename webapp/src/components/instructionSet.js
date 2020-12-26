export const instruction_set = [
	{
    name:"Common Terms",
    instructions:[
        {
            "opcode":"u_word_num",
            "name":"",
            "example":"",
            "description":"16-bit number. Can be binary, decimal or hexadecimal.",
            "usage":[]
        },
        {
            "opcode":"u_byte_num",
            "name":"",
            "example":"",
            "description":"8-bit number. Can be binary, decimal or hexadecimal.",
            "usage":[]
        },
        {
            "opcode":"s_word_num",
            "name":"",
            "example":"",
            "description":"16-bit number. Can be binary, decimal or hexadecimal.",
            "usage":[]
        },
        {
            "opcode":"s_byte_num",
            "name":"",
            "example":"",
            "description":"8-bit number. Can be binary, decimal or hexadecimal.",
            "usage":[]
        },
        {
            "opcode":"gen_reg",
            "name":"Genaral Registers",
            "example":"",
            "description":"Consists of Byte resgiters and Word registers",
            "usage":["AH","AL","BH","BL","CH","CL","DH","DL","AX","BX","CX","DX","SP","BP","SI","DI"]
        },
        {
            "opcode":"byte_label",
            "name":"",
            "example":"BYTE label_1",
            "description":"Used to define label of type byte.",
            "usage":[]
        },
        {
            "opcode":"word_label",
            "name":"",
            "example":"WORD label_1",
            "description":"Used to define label of type word.",
            "usage":[]
        }
    ]
	},{
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
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`,
			usage: ['TYPE : Reg , Reg :','MOV gen_reg , gen_reg', 'MOV word_reg , word_reg' , 'TYPE : Reg , Mem :','MOV gen_reg , byte mem_add', 'MOV gen_reg , word mem_add' ,'MOV gen_reg , byte_label','MOV gen_reg , word_label','TYPE : Mem , Reg :','MOV byte mem_add , gen_byte_reg' ,'MOV word mem_add , gen_word_reg'
,'MOV byte_label , gen_byte_reg'
,'MOV word_label , gen_word_reg'
,'TYPE : Reg , Immediate:'
,'MOV gen_byte_reg , u_byte_num'
,'MOV gen_word_reg , u_word_num'  
,'TYPE : Mem , Immediate :'
,'MOV byte mem_add , u_byte_num'
,'MOV word mem_add , u_word_num'
,'MOV byte_label , u_byte_num'
,'MOV word_label , u_word_num'
,'TYPE : Seg-Reg,Reg:'
,'MOV seg_reg,gen_word_reg'
,'TYPE : Reg,Seg-Reg,:'
,'MOV gen_word_reg,seg_reg'
,'TYPE : Mem,Seg-Reg:'
,'MOV mem_add,seg_reg'
,'MOV word_label,seg_reg'
,'TYPE : Seg-Reg,Mem:'
,'MOV seg_reg,mem_add,'
,'MOV seg_reg,word_label'
]
		},
		{
			opcode: 'XCHG',
			name: 'Exchange',
			example: 'XCHG AX,BX',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.',
			usage : [	
					'TYPE :  Reg , Reg :
					,'XCHG gen_byte_reg, gen_byte_reg '
					,'XCHG gen_word_reg , gen_word_reg '
					,'TYPE : Mem,Reg :'
					,'XCHG byte mem_add, gen_byte_reg '
					,'XCHG word mem_add, gen_word_reg '
					,'XCHG byte byte_label, gen_byte_reg' 
					,'XCHG word word_label, gen_word_reg '
					,'TYPE : Reg,Mem :'
					,'XCHG gen_byte_reg ,byte mem_add'
					,'XCHG gen_word_reg ,word mem_add'
					,'XCHG byte gen_byte_reg ,byte_label'
					,'XCHG word gen_word_reg ,word_add'
]
		},
		{
			opcode: 'IN',
			name: 'OP_IN',
			example: 'IN AX, DX',
			description: 'Used to read a byte or word from the provided port to the accumulator.',
			usage:[ 'IN u_byte_num,gen_byte_reg ', 'IN gen_byte_reg,gen_byte_reg']
		},
		{
			opcode: 'OUT',
			name: 'OP_OUT',
			example: 'OUT 05, AL',
			description: 'Used to send out a byte or word from the accumulator to the provided port.',
			usage : ['OUT gen_byte_reg ,u_byte_num','OUT gen_byte_reg,gen_byte_reg']
		},{
			opcode: 'POP'  ,
			name:   'POP from stack' ,
			example:  'POP AS'  ,
			description: 'Used to get a word from the top of the stack to the provided location.'  ,
			usage :['POP pop_reg','POP word mem_add ','POP word_label']
		
		},
		       {
			opcode: 'PUSH'  ,
			name:   'PUSH into stacl' ,
			example: 'PUSH DX'   ,
			description: 'Used to put a word at the top of the stack'  ,
			usage :['PUSH pop_reg','PUSH cs_reg','PUSH word mem_add' ,'PUSH word_label']
		
		},{
			opcode: 'LDS/LES'  ,
			name:   'Load DS/ES register' ,
			example: ''   ,
			description: 'Used to load DS/ES register and other provided register from the memory'  ,
			usage :['LDS gen_reg,mem_add','LES gen_reg,mem_add']
		
		},{
			opcode: 'LEA'  ,
			name:   'Load address of operand' ,
			example:  ''  ,
			description: 'Used to load the address of operand into the provided register.'  ,
			usage :['LEA gen_word_reg , word mem_add','LEA gen_word_reg , word label']
		
		},
	]
},{	
	name:"BIT MANIPULATION",
	instructions:[{
			opcode: 'NOT'  ,
			name:  'Flip a bit'  ,
			example: 'NOT AL'   ,
			description: 'Used to invert each bit of a byte or word.'  ,
			usage :['NOT gen_reg'
,'NOT byte mem_add'
,'NOT word mem_add'
,'NOT word_label'
,'NOT byte_label']
		
		},{
			opcode:  'binary_logical: AND , OR , XOR , TEST',
			name:    'Logical AND OR XOR & TEST',
			example:  'AND AX, 0010  , OR AX, BX , XOR AL, BL , TEST [0250], 06',
			description: 'AND − Used for adding each bit in a byte/word with the corresponding bit in another byte/word.     OR − Used to multiply each bit in a byte/word with the corresponding bit in another byte/word.    XOR − Used to perform Exclusive-OR operation over each bit in a byte/word with the corresponding bit in another byte/wor     TEST − Used to add operands to update flags, without affecting operands.'  ,
			usage :['TYPE : Reg , Reg :',
'binary_logical gen_reg , gen_reg',
'binary_logical word_reg , word_reg',
'TYPE : Reg , Mem :',
'binary_logical gen_reg , byte mem_add ',
'binary_logical gen_reg , word mem_add ',
'binary_logical gen_reg , byte_label ',
'binary_logical gen_reg , word_label ',
'TYPE : Mem , Reg :',
'binary_logical byte mem_add , gen_byte_reg ',
'binary_logical word mem_add , gen_word_reg ',
'binary_logical byte_label , gen_byte_reg',
'binary_logical word_label , gen_word_reg',
'TYPE :Reg , Immediate:',
'bianry_logical gen_byte_reg , u_byte_num',
'bianry_logical gen_word_reg , u_word_num  ',
'TYPE : Mem , Immediate :',
'binary_logical byte mem_add , u_byte_num',
'binary_logical word mem_add , u_word_num',
'binary_logical byte_label , u_byte_num',
'binary_logical word_label , u_word_num',]
		},{
			opcode: 'shift_rotate : SHL/SAL , SAR , SHR , ROL , ROR , RCL , RCR',
			name:   '' ,
			example: ''   ,
			description:  'SAL/SHL - Used to shift bits of a byte/word towards left and put zero(S) in LSBs. , SAR  - Used to shift bits of a byte/word towards the right and copy the old MSB into the new MSB. , SHR - Used to shift bits of a byte/word towards the right and put zero(S) in MSBs. , ROL - Used to rotate bits of byte/word towards the left, i.e. MSB to LSB and to Carry Flag [CF]. , ROR - Used to rotate bits of byte/word towards the right, i.e. LSB to MSB and to Carry Flag [CF]. , RCL - Used to rotate bits of byte/word towards the left, i.e. MSB to CF and CF to LSB. , RCR - Used to rotate bits of byte/word towards the right, i.e. LSB to CF and CF to MSB.',
			usage :['TYPE : Register:'
'shift_rotate gen_reg , u_byte_num',
'shift_rotate gen_reg , CL',
'TYPE : Memory:',
'shift_rotate byte mem_add , u_byte_num',
'shift_rotate byte mem_add , CL',
'shift_rotate word mem_add , u_byte_num',
'shift_rotate word mem_add , CL']
		
		}]

	














}]
