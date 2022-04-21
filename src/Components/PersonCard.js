import "../style.css"

function PersonCard() {
    return (
        <div className = {"PersonCard"}>
            <div className={"cardContent"}>
              id
              Name
                Last Name
            </div>
            <div className={"buttonsBlock"}>
              <button className={"editButton"}> edit </button>
              <button className={"deleteButton"}> delete </button>
            </div>
        </div>
        )
}
export default PersonCard