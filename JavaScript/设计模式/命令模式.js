const setCommand = (button, command) => {
    button.onclick = () => {
        command.execute()
    }
}
const MenuBar = {
    refresh:()=>{
        console.log("refresh")
    }
}
const RefreshMenuBarCommand = (recevier) => {
    return{
        execute:()=>{
            recevier.refresh()
        }
    }
}
const refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
setCommand(refreshButton, refreshMenuBarCommand)
