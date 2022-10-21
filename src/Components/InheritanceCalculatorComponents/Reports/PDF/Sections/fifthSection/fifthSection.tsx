import { Image, View } from "@react-pdf/renderer";
import { styles } from "../../styles";
import domtoimage from "dom-to-image";
import { useState } from "react";

export const FifthSection = (): JSX.Element => {
  const [url, setUrl] = useState("src/assets/images/arvebot-logo.png");
  const node = document.querySelector(".react-flow") as Node;
  domtoimage
    .toPng(node, {
      filter: (node: Node): boolean => {
        // we don't want to add the minimap and the controls to the image

        if (
          (node as HTMLElement)?.classList?.contains("react-flow__minimap") ||
          (node as HTMLElement)?.classList?.contains("react-flow__controls")
        ) {
          return false;
        }
        return true;
      },
    })
    .then(function (dataUrl: any) {
      setUrl(dataUrl);
    })
    .catch(function (error: any) {
      console.error("oops, something went wrong!", error);
    });
  return (
    <View style={styles.imageView} wrap={false}>
      <Image style={styles.image} src={url} />
    </View>
  );
};
