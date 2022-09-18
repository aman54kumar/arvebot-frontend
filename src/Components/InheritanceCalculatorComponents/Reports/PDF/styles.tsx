import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    fontFamily: "Times-Roman",
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    margin: 10,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "Times-Roman",
  },
  heading: {
    fontSize: 24,
    color: "#17365D",
    marginBottom: 10,
    textDecoration: "underline",
  },
  subheading: {
    fontSize: 14,
    color: "#2979ff",
    fontFamily: "Helvetica-Bold",
  },
  paragraphHeading: {
    fontSize: 10,
    color: "#365F91",
    fontFamily: "Helvetica-Bold",
  },
  paragraph: {
    fontSize: 10,
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  boldValue: {
    fontFamily: "Times-Bold",
    fontWeight: 600,
  },
  italicValue: {
    fontFamily: "Times-Italic",
    fontStyle: "italic",
  },
  urlStyle: {
    fontFamily: "Times-Roman",
    color: "#1a0dab",
  },
  tableHeaderRow: {
    backgroundColor: "grey",
    borderWidth: 0,
    fontSize: 12,
    textAlign: "center",
  },
  tableDataRow: {
    backgroundColor: "white",
    borderWidth: 0,
    fontSize: 10,
    textAlign: "center",
  },
  marginTop: {
    marginTop: 10,
  },
});
