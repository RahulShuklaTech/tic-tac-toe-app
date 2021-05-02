import Square from "./Square"
export default function Board(props) {
    

    return (

        <div className = "board"> {
            props.cells.map((item,index)=> <Square key = {index} value = {item} handleClick = {() => props.handleClick(index)} />)
        }</div>
    
    )


}

