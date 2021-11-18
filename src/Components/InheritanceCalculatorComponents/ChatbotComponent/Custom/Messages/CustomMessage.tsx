import InfoMessagesWidget from "../Widgets/InfoMessagesWidget/InfoMessagesWidget";

const CustomMessage = (props: any) => {
    return (
        <InfoMessagesWidget label={props.label} />
    );
};

export default CustomMessage;