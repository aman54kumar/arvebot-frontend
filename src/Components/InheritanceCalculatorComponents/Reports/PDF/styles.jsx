import { StyleSheet} from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        color: "black",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    heading: {
        fontSize: "26px",
        color: '#1976d2'
    },
    subheading: {
        fontsize: "18px",
        color: "#2979ff"
    },
    paragraph: {
        fontSize: "12px"
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});
