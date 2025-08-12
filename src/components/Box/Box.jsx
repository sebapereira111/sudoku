import './Box.css'

function Box({ tableroBox, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex }) {
    return (
        <div className='box' >
            {tableroBox}
        </div>
    )
}

export default Box