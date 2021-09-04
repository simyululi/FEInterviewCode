class MacroCommand {
    constructor() {
        this.commands = []
    }
    add(command){
        console.log(this)
        this.commands.push(command)
    }
    execute(){
        for(let i = 0; i < this.commands.length; i++){
            this.commands[i].execute()
        }
    }
}
const macroCommand = MacroCommand()
const openCommand = {
    execute: () => {
        console.log("open")
    }
}
const closeCommand = {
    execute: () => {
        console.log("close")
    }
}
macroCommand.add(openCommand)
macroCommand.add(closeCommand)
macroCommand.execute()
