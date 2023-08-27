import React from "react";
import "./Howto.css";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
const Howto = () => {
  return (
    <div className="howto">
      <Card>
        <Card.Body>
          <Card.Title>Video Example</Card.Title>
          <Figure>
            <Figure.Image
              width={400}
              height={300}
              alt="Video"
              src="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4"
              controls // Add this attribute for video controls
            />
            <Figure.Caption>
              A sample video using react-bootstrap.
            </Figure.Caption>
          </Figure>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Howto;
