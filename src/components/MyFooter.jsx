import { Row, Col } from "react-bootstrap";

const MyFooter = () => (
    <footer className="footer">
        <Row className="text-center mt-5">
            <Col xs={{ span: 6, offset: 3 }}>
                <Row>
                    <Col xs={12} className="text-left text-light mb-2">
                        <i className="fa fa-facebook footer-icon m-2"></i>
                        <i className="fa fa-instagram footer-icon m-2"></i>
                        <i className="fa fa-youtube footer-icon m-2"></i>
                        <i className="fa fa-spotify footer-icon m-2"></i>
                    </Col>
                </Row>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
                    <Col>
                        <Row>
                            <Col xs={12} className="footer-links">
                                <p>
                                    <a href="https://www.facebook.com/cesarecremoniniufficiale" alt="footer link">
                                        Facebook
                                    </a>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={12} className="footer-links">
                                <p>
                                    <a href="https://www.instagram.com/cesarecremonini/" alt="footer link">
                                        Instagram
                                    </a>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={12} className="footer-links">
                                <p>
                                    <a href="https://www.youtube.com/channel/UCA_Eh4mNLQSZ-I3njCk2Hcg" alt="footer link">
                                        Youtube
                                    </a>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={12} className="footer-links">
                                <p>
                                    <a href="https://open.spotify.com/intl-it/artist/396Jr76018oUMR6QBnqT8T" alt="footer link">
                                        Spotify
                                    </a>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="text-left mb-2 mt-2 copyright">
                        © Since1999-{new Date().getFullYear()} Fabrizio D'Alessandro
                    </Col>
                </Row>
            </Col>
        </Row>
    </footer>
);

export default MyFooter;
