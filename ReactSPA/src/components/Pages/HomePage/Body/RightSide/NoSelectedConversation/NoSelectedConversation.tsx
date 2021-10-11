import { VerticalLogo } from "../../../../../shared/logo/Logos"
import "./NoSelectedConversation.css"

function NoSelectedConversation() 
{
    return <div className="no-selected-conversation">
        <VerticalLogo />
        <span className="fw-bold fs-5"> Select a conversation to start chating </span>
    </div>
}

export default NoSelectedConversation