import { StyleSheet, Font} from "@react-pdf/renderer";

Font.register({
    family: 'Open Sans',
    fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
    ]
    });


export const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        color: "black",
        fontFamily: "Open Sans"
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
        fontFamily: "Open Sans"
    },
    heading: {
        fontSize: "26px",
        color: '#1976d2'
    },
    subheading: {
        fontsize: "18px",
        color: "#2979ff",
        fontFamily: "Open Sans"
    },
    paragraph: {
        fontSize: "12px",
        fontFamily: "Open Sans"
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
    boldValue: {
        fontFamily: "Open Sans",
        fontWeight: 600
    },
    italicValue: {
        fontFamily: "Open Sans",
        fontStyle: "italic"
    }
});
