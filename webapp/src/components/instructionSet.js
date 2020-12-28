export const instruction_set = [
  {
    name: "Common Terms",
    instructions: [
      {
        opcode: "label",
        name: "",
        example: "Label1:",
        description:
          "A single, no space containing word, immediately followed by a colon (:) when defining the label. Can contain _, 0-9, a-z, A-Z, but must not start with a number.",
        usage: [],
      },
      {
        opcode: "unsigned_word_number",
        name: "",
        example: "",
        description:
          "16-bit number. Can be binary, decimal or hexadecimal. Numbers in range 0 -> 65535.",
        usage: [],
      },
      {
        opcode: "unsigned_byte_number",
        name: "",
        example: "",
        description:
          "8-bit number. Can be binary, decimal or hexadecimal. Number in range 0 -> 255.",
        usage: [],
      },
      {
        opcode: "signed_word_number",
        name: "",
        example: "",
        description:
          "16-bit number. Can be binary, decimal or hexadecimal. Numbers in range -32768 -> 32767, only decimal numbers with '-' can be used, for other format use 2's complement for negating.",
        usage: [],
      },
      {
        opcode: "signed_byte_number",
        name: "",
        example: "",
        description:
          "8-bit number. Can be binary, decimal or hexadecimal. Number in range -128 -> 127, only decimal numbers with '-' can be used, for other format use 2's complement for negating.",
        usage: [],
      },
      {
        opcode: "general_register",
        name: "Genaral Registers",
        example: "",
        description: "Consists of Byte resgiters and Word registers",
        usage: [
          "Byte Register:",
          "AH",
          "AL",
          "BH",
          "BL",
          "CH",
          "CL",
          "DH",
          "DL",
          "Word Register:",
          "AX",
          "BX",
          "CX",
          "DX",
          "SP",
          "BP",
          "SI",
          "DI",
        ],
      },
      {
        opcode: "segment_register",
        name: "Segment Registers",
        example: "",
        description: "Consists ofsegment registers",
        usage: ["ES", "DS", "SS", "CS"],
      },
      {
        opcode: "byte_label",
        name: "",
        example: "BYTE label_1",
        description: "Used to define label of type byte. Actual word 'byte'",
        usage: [],
      },
      {
        opcode: "word_label",
        name: "",
        example: "WORD label_1",
        description: "Used to define label of type word. Actual  word 'word'",
        usage: [],
      },
      {
        opcode: "Number format",
        name: "",
        example: "",
        description:
          "Three formats of numbers: 1) Decimal : using 0-9. 2) Binary : using 0 and 1, must start with 0b, eg : 5 = 0b0101 3) Hexadecimal : using 0-9,a-f, must start with 0x, eg : 5 = 0x5",
        usage: [],
      },
    ],
  },{
	name: 'Arithmetic',
	instructions: [{
			opcode: 'ADD',
			name: 'Add',
			example: 'ADD AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`,
			usage: ['ADD byte-register , byte-register'
					'ADD word-register , word-register',
					'ADD byte-register , byte memory',
					'ADD word-register , word memory',
					'ADD byte-register , byte label',
					'ADD word-register , word label',
					'ADD byte memory , byte-register',
					'ADD word memory , word-register',
					'ADD byte label , byte-register',
					'ADD word label , word-register',
					'ADD byte-register , unsigned/signed byte number',
					'ADD word-register , unsigned/signed word number',
					'ADD byte memory , unsigned/signed byte number',
					'ADD word memory , unsigned/signed word number',
					'ADD byte label , unsigned/signed byte number',
					'ADD word label , unsigned/signed word number']
		},
		{
			opcode: 'ADC',
			name: 'Add with carry',
			example: 'ADC AX ,BX',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.',
			usage: ['ADC byte-register , byte-register'
					'ADC word-register , word-register',
					'ADC byte-register , byte memory',
					'ADC word-register , word memory',
					'ADC byte-register , byte label',
					'ADC word-register , word label',
					'ADC byte memory , byte-register',
					'ADC word memory , word-register',
					'ADC byte label , byte-register',
					'ADC word label , word-register',
					'ADC byte-register , unsigned/signed byte number',
					'ADC word-register , unsigned/signed word number',
					'ADC byte memory , unsigned/signed byte number',
					'ADC word memory , unsigned/signed word number',
					'ADC byte label , unsigned/signed byte number',
					'ADC word label , unsigned/signed word number']
		},
		{
			opcode: 'SUB',
			name: 'Subtract',
			example: 'SUB AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`,
			usage: ['SUB byte-register , byte-register'
					'SUB word-register , word-register',
					'SUB byte-register , byte memory',
					'SUB word-register , word memory',
					'SUB byte-register , byte label',
					'SUB word-register , word label',
					'SUB byte memory , byte-register',
					'SUB word memory , word-register',
					'SUB byte label , byte-register',
					'SUB word label , word-register',
					'SUB byte-register , unsigned/signed byte number',
					'SUB word-register , unsigned/signed word number',
					'SUB byte memory , unsigned/signed byte number',
					'SUB word memory , unsigned/signed word number',
					'SUB byte label , unsigned/signed byte number',
					'SUB word label , unsigned/signed word number']
		},
		{
			opcode: 'SBB',
			name: 'Subtract with Borrow',
			example: 'SBB AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`,
			usage: ['SBB byte-register , byte-register'
					'SBB word-register , word-register',
					'SBB byte-register , byte memory',
					'SBB word-register , word memory',
					'SBB byte-register , byte label',
					'SBB word-register , word label',
					'SBB byte memory , byte-register',
					'SBB word memory , word-register',
					'SBB byte label , byte-register',
					'SBB word label , word-register',
					'SBB byte-register , unsigned/signed byte number',
					'SBB word-register , unsigned/signed word number',
					'SBB byte memory , unsigned/signed byte number',
					'SBB word memory , unsigned/signed word number',
					'SBB byte label , unsigned/signed byte number',
					'SBB word label , unsigned/signed word number']
		},{opcode: 'NEG',
			name: ' NEG instruction negates a value',
			example: 'NEG AL',
			description: 'Replace the value of the byte, word, or long with its two\'s complement; that is, neg subtracts the byte, word, or long value from 0, and puts the result in the byte, word, or long respectively. neg sets the carry flag to 1, unless initial value of the byte, word, or long is 0.',
			usage : ['NEG byte-register',
					'NEG word-register',
					'NEG byte memory',
					'NEG word memory',
					'NEG byte label',
					'NEG word label']
		},
		{	
			opcode: 'MUL',
			name: 'Unsigned Multiplication',
			example: 'MUL AX,BX',
			description: 'This instruction increases the contents of  the specified register or memory location by 1. All the condition code flags are affected except the carry flag. Immediate data cannot be operand of this instruction.',
			usage : ['MUL byte-register',
					'MUL word-register',
					'MUL byte memory',
					'MUL word memory',
					'MUL byte label',
					'MUL word label']
		}, {
			opcode: 'IMUL',
			name: 'Signed Multiplication',
			example: 'IMUL AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`,
			usage : ['IMUL byte-register',
					'IMUL word-register',
					'IMUL byte memory',
					'IMUL word memory',
					'IMUL byte label',
					'IMUL word label']
		},
		{
			opcode: 'DIV',
			name: 'Unsigned Divison',
			example: 'DIV AX ,BX',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.',
			usage : ['DIV byte-register',
					'DIV word-register',
					'DIV byte memory',
					'DIV word memory',
					'DIV byte label',
					'DIV word label']
		},
		{
			opcode: 'IDIV',
			name: 'Signed Divison',
			example: 'IDIV AX,BX',
			description: 'This instruction increases the contents of  the specified register or memory location by 1. All the condition code flags are affected except the carry flag. Immediate data cannot be operand of this instruction.',
			usage : ['IDIV byte-register',
					'IDIV word-register',
					'IDIV byte memory',
					'IDIV word memory',
					'IDIV byte label',
					'IDIV word label']
		},
		{
			opcode: 'INC',
			name: 'Increment',
			example: 'INC AX',
			description: 'This instruction increases the contents of  the specified register or memory location by 1. All the condition code flags are affected except the carry flag. Immediate data cannot be operand of this instruction.',
			usage : ['INC byte-register',
					'INC word-register',
					'INC byte memory',
					'INC word memory',
					'INC byte label',
					'INC word label']
		},
		{
			opcode: 'DEC',
			name: 'Decrement',
			example: 'DEC AX',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.',
			usage : ['DEC byte-register',
						'DEC word-register',
						'DEC byte memory',
						'DEC word memory',
						'DEC byte label',
						'DEC word label']
		},
		{
			opcode:'AAA',
			name:'Adjust ASCII',
			example: 'AAA',
			description : 'Used to adjust ASCII after addition.',
			usage : ['AAA']
		},
		{
			opcode:'AAD',
			name:'Adjust ASCII after division',
			example: 'AAD',
			description : 'Used to adjust ASCII codes after division.',
			usage : ['AAD']
		},
		{
			opcode:'AAM',
			name:'Adjust ASCII after multiplication',
			example: 'AAM',
			description : 'Used to adjust ASCII codes after multiplication.',
			usage : ['AAM']
		},
		{
			opcode:'AAS',
			name:'Adjust ASCII after subtraction',
			example: 'AAS',
			description : 'Used to adjust ASCII codes after subtraction.',
			usage : ['AAS']
		},
		{
			opcode:'DAA',
			name:'Adjust decimal after add/sub',
			example: 'DAA',
			description : 'Used to adjust the decimal after the addition/subtraction operation.',
			usage : ['DAA']
		},
		{
			opcode:'DAS',
			name:'Adjust decimal after subtraction',
			example: 'DAS',
			description : 'Used to adjust decimal after subtraction.',
			usage : ['DAS']
		},
		{
			opcode:'CBW',
			name:'',
			example: 'CBW',
			description : 'Used to fill the upper byte of the word with the copies of sign bit of the lower byte.',
			usage : ['CBW']
		},
		{
			opcode:'CWD',
			name:'',
			example: 'CWD',
			description : 'Used to fill the upper word of the double word with the sign bit of the lower word.',
			usage : ['CWD']
		}
	]
}, {
	name: 'Data Transfer',
	instructions: [{
			opcode: 'MOV',
			name: 'Move',
			example: 'MOV AX, BX',
			description: `This instruction adds an immediate data or contents of  a memory location specified in the instruction or a register (source) to the contents of another register (destination) or memory location. The result is in the destination operand. Memory to memory addition is not possible. All the condition code flags are affected, depending upon the result.`,
			usage: ['TYPE : Reg , Reg :','MOV register , register', 'MOV word_reg , word_reg' , 'TYPE : Reg , Mem :','MOV register , byte memory', 'MOV register , word memory' ,'MOV register , byte label','MOV register , word label','TYPE : Mem , Reg :','MOV byte memory , byte-register' ,'MOV word memory , word-register'
			,'MOV byte label , byte-register'
			,'MOV word label , word-register'
			,'TYPE : Reg , Immediate:'
			,'MOV byte-register , unsigned/signed byte number'
			,'MOV word-register , unsigned/signed word number'  
			,'TYPE : Mem , Immediate :'
			,'MOV byte memory , unsigned/signed byte number'
			,'MOV word memory , unsigned/signed word number'
			,'MOV byte label , unsigned/signed byte number'
			,'MOV word label , unsigned/signed word number'
			,'TYPE : Seg-Reg,Reg:'
			,'MOV segment-register,word-register'
			,'TYPE : Reg,Seg-Reg,:'
			,'MOV word-register,segment-register'
			,'TYPE : Mem,Seg-Reg:'
			,'MOV memory,segment-register'
			,'MOV word label,segment-register'
			,'TYPE : Seg-Reg,Mem:'
			,'MOV segment-register,memory,'
			,'MOV segment-register,word label'
			]
		},
		{
			opcode: 'XCHG',
			name: 'Exchange',
			example: 'XCHG AX,BX',
			description: 'This instruction performs the same operation as ADD instruction , but adds the carry flag bit to the result.',
			usage : [	
					'TYPE :  Reg , Reg :',
					,'XCHG byte-register, byte-register '
					,'XCHG word-register , word-register '
					,'TYPE : Mem,Reg :'
					,'XCHG byte memory, byte-register '
					,'XCHG word memory, word-register '
					,'XCHG byte byte label, byte-register' 
					,'XCHG word word label, word-register '
					,'TYPE : Reg,Mem :'
					,'XCHG byte-register ,byte memory'
					,'XCHG word-register ,word memory'
					,'XCHG byte byte-register ,byte label'
					,'XCHG word word-register ,word_add'
]
		},
		{
			opcode: 'IN',
			name: 'OP_IN',
			example: 'IN AX, DX',
			description: 'Used to read a byte or word from the provided port to the accumulator.',
			usage:[ 'IN unsigned byte number,byte-register ', 'IN byte-register,byte-register']
		},
		{
			opcode: 'OUT',
			name: 'OP_OUT',
			example: 'OUT 05, AL',
			description: 'Used to send out a byte or word from the accumulator to the provided port.',
			usage : ['OUT byte-register ,unsigned byte number','OUT byte-register,byte-register']
		},{
			opcode: 'POP'  ,
			name:   'POP from stack' ,
			example:  'POP AS'  ,
			description: 'Used to get a word from the top of the stack to the provided location.'  ,
			usage :['POP pop_reg','POP word memory ','POP word label']
		
		},
		       {
			opcode: 'PUSH'  ,
			name:   'PUSH into stacl' ,
			example: 'PUSH DX'   ,
			description: 'Used to put a word at the top of the stack'  ,
			usage :['PUSH pop_reg','PUSH cs_reg','PUSH word memory' ,'PUSH word label']
		
		},{
			opcode: 'LDS/LES'  ,
			name:   'Load DS/ES register' ,
			example: ''   ,
			description: 'Used to load DS/ES register and other provided register from the memory'  ,
			usage :['LDS register,memory','LES register,memory']
		
		},{
			opcode: 'LEA'  ,
			name:   'Load address of operand' ,
			example:  ''  ,
			description: 'Used to load the address of operand into the provided register.'  ,
			usage :['LEA word-register , word memory','LEA word-register , word label']
		
		}
	]
},	
	{	
	name:"BIT MANIPULATION",
	instructions:[{
			opcode: 'NOT'  ,
			name:  'Flip a bit'  ,
			example: 'NOT AL'   ,
			description: 'Used to invert each bit of a byte or word.'  ,
			usage :['NOT register'
					,'NOT byte memory'
					,'NOT word memory'
					,'NOT word label'
					,'NOT byte label']
		
		},{
			opcode:  'opcode: AND , OR , XOR , TEST',
			name:    'Logical AND OR XOR & TEST',
			example:  'AND AX, 0010  , OR AX, BX , XOR AL, BL , TEST [0250], 06',
			description: 'AND − Used for adding each bit in a byte/word with the corresponding bit in another byte/word.     OR − Used to multiply each bit in a byte/word with the corresponding bit in another byte/word.    XOR − Used to perform Exclusive-OR operation over each bit in a byte/word with the corresponding bit in another byte/wor     TEST − Used to add operands to update flags, without affecting operands.'  ,
			usage :['TYPE : Reg , Reg :',
					'opcode register , register',
					'opcode word_reg , word_reg',
					'TYPE : Reg , Mem :',
					'opcode register , byte memory ',
					'opcode register , word memory ',
					'opcode register , byte label ',
					'opcode register , word label ',
					'TYPE : Mem , Reg :',
					'opcode byte memory , byte-register ',
					'opcode word memory , word-register ',
					'opcode byte label , byte-register',
					'opcode word label , word-register',
					'TYPE :Reg , Immediate:',
					'bianry_logical byte-register , unsigned byte number',
					'bianry_logical word-register , unsigned word number  ',
					'TYPE : Mem , Immediate :',
					'opcode byte memory , unsigned byte number',
					'opcode word memory , unsigned word number',
					'opcode byte label , unsigned byte number',
					'opcode word label , unsigned word number',]
		},{
			opcode: 'opcode : SHL/SAL , SAR , SHR , ROL , ROR , RCL , RCR',
			name:   '' ,
			example: ''   ,
			description:  'SAL/SHL - Used to shift bits of a byte/word towards left and put zero(S) in LSBs. , SAR  - Used to shift bits of a byte/word towards the right and copy the old MSB into the new MSB. , SHR - Used to shift bits of a byte/word towards the right and put zero(S) in MSBs. , ROL - Used to rotate bits of byte/word towards the left, i.e. MSB to LSB and to Carry Flag [CF]. , ROR - Used to rotate bits of byte/word towards the right, i.e. LSB to MSB and to Carry Flag [CF]. , RCL - Used to rotate bits of byte/word towards the left, i.e. MSB to CF and CF to LSB. , RCR - Used to rotate bits of byte/word towards the right, i.e. LSB to CF and CF to MSB.',
			usage :['TYPE : Register:'
					'opcode register , unsigned byte number',
					'opcode word-register , unsigned byte number',
					'opcode byte-register , CL',
					'opcode word-register , CL',
					'TYPE : Memory:',
					'opcode byte memory , unsigned byte number',
					'opcode byte label , unsigned byte number',
					'opcode word label , unsigned byte number',
					'opcode word memory , unsigned byte number',
					'opcode byte memory , CL',
					'opcode word memory , CL',
					'opcode byte label , CL',
					'opcode word label , CL']
		
		}
 	,
      {
        name: "Control Transfer",
        instructions: [
          {
            opcode: "CALL",
            name: "CALL",
            example: "CALL Label1",
            description:
              "Used whenever we need to make a call to some procedure.",
            usage: ["CALL procedure_name"],
          },
          {
            opcode: "RET",
            name: "RET",
            example: "RET",
            description: "Used at the end of the procedures.",
            usage: ["RET"],
          },
          {
            opcode: "JUMP",
            name: "JUMP",
            example: "JMP label1",
            description:
              "Used for changing the flow of execution of instructions in the processor. Types: jmp, ja, jnbe, jae, jnb, jb, jnae, jbe, jna, jc, je, jz, jg, jnle, jge, jnl, jl, jnge, jle, jng, jnc, jne, jnz, jno, jnp, jpo, jns, jo, jp, jpe, js, jcxz",
            usage: ["any_Type_of_jump label_name"],
          },
          {
            opcode: "INT",
            name: "Interrupt",
            example: "INT 3",
            description:
              "Generates software interrupts. Types: 1) int 3: Can be used for debugging, displays user prompt. 2) int 0x10 : value of AH allowed are : 0AH,13H . 0AH ignores BH & BL (page number and page attribute) . 13H ignores AL (write mode), BH & BL (page number and attributes), DH (row to print the string on), supports DL (column to print string on). 3) int 0x21 : value of AH allowed are : 1H,2H,0AH. * INTO and IRET aren't supported.",
            usage: ["INT type_Of_Interrupt"],
          },
        ],
      },
      {
        name: "Control",
        instructions: [
          {
            opcode: "STC",
            name: "STC",
            example: "STC",
            description: "Set carry flag CF to 1.",
            usage: ["STC"],
          },
          {
            opcode: "CLC",
            name: "CLC",
            example: "CLC",
            description:
              "Clear Carry Flag: This instruction resets the carry flag CF to 0.",
            usage: ["CLC"],
          },
          {
            opcode: "CMC",
            name: "CMC",
            example: "CMC",
            description: "This instruction take complement of carry flag CF.",
            usage: ["CMC"],
          },
          {
            opcode: "STD",
            name: "STD",
            example: "STD",
            description: "Set direction flag to 1.",
            usage: ["STD"],
          },
          {
            opcode: "CLD",
            name: "CLD",
            example: "CLD",
            description:
              "Clear Direction Flag: This instruction resets the direction flag DF to 0.",
            usage: ["CLD"],
          },
          {
            opcode: "STI",
            name: "STI",
            example: "STI",
            description: "Set interrupt flag IF to 1.",
            usage: ["STI"],
          },
          {
            opcode: "CLI",
            name: "CLI",
            example: "CLI",
            description:
              "Clear Interrupt Flag: This instruction resets the interrupt flag IF to 0.",
            usage: ["CLI"],
          },
          {
            opcode: "HLT",
            name: "HLT",
            example: "HLT",
            description: "Halt processing. It stops program execution.",
            usage: ["HLT"],
          },
        ],
      },
    ],
  },
  {
    name: "String",
    instructions: [
      {
        opcode: "MOVS",
        name: "MOVS",
        example: "MOVS byte",
        description: "Used to move the byte/word from one string to another.",
        usage: ["MOVS byte", "MOVS word"],
      },
      {
        opcode: "LODS",
        name: "LODS",
        example: "LODS byte",
        description:
          "Used to store the string byte into AL or string word into AX.",
        usage: ["LODS byte", "LODS word"],
      },
      {
        opcode: "STOS",
        name: "STOS",
        example: "STOS byte",
        description:
          "Copies the data item from AL (for bytes), AX (for words) to the destination string, pointed to by ES:DI in memory.",
        usage: ["STOS byte", "STOS word"],
      },
      {
        opcode: "CMPS",
        name: "CMPS",
        example: "CMPS byte",
        description:
          "Compares two strings. This instruction compares two data items of one byte, word, pointed to by the DS:SI and ES:DI registers and sets the flags accordingly.",
        usage: ["CMPS byte", "CMPS word"],
      },
      {
        opcode: "SCAS",
        name: "SCAS",
        example: "SCAS byte",
        description:
          "Used for searching a particular character or set of characters in a string.",
        usage: ["SCAS byte", "SCAS word"],
      },
      {
        opcode: "REP",
        name: "REP",
        example: "REP MOVS byte",
        description:
          "Used to repeat the given instruction till CX ≠ 0. It supports MOVS, LODS and STOS.",
        usage: [
          "REP MOVS byte",
          "REP MOVS word",
          "REP LODS byte",
   		  "REP LODS word",
          "REP STOS byte",
          "REP STOS word",
        ],
      },
      {
        opcode: "REPE / REPZ",
        name: "REPE / REPZ",
        example: "REPE CMPS byte",
        description:
          "Used to repeat the given instruction until CX = 0 or zero flag ZF = 0.",
        usage: [
          "REPE CMPS byte",
          "REPE CMPS word",
          "REPE SCAS byte",
          "REPE SCAS word",
          "REPZ CMPS byte",
          "REPZ CMPS word",
          "REPZ SCAS byte",
          "REPZ SCAS word",
        ],
      },
      {
        opcode: "REPNE / REPNZ",
        name: "REPNE / REPNZ",
        example: "REPNE CMPS byte",
        description:
          "Used to repeat the given instruction until CX = 0 or zero flag ZF = 1.",
        usage: [
          "REPNE CMPS byte",
          "REPNE CMPS word",
          "REPNE SCAS byte",
          "REPNE SCAS word",
          "REPNZ CMPS byte",
          "REPNZ CMPS word",
          "REPNZ SCAS byte",
          "REPNZ SCAS word",
        ],
      },
    ],
  },
];
