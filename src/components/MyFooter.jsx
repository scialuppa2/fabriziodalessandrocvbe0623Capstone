import { Row, Col } from "react-bootstrap";

const MyFooter = () => (
    <footer className="footer">
        <Row className="text-center mt-5">
            <Col xs={{ span: 6, offset: 3 }}>
                <Row>
                    <Col xs={12} className="text-left mb-2">
                        <i className="fa fa-facebook footer-icon m-2"></i>
                        <i className="fa fa-instagram footer-icon m-2"></i>
                        <i className="fa fa-twitter footer-icon m-2"></i>
                        <i className="fa fa-youtube footer-icon m-2"></i>
                    </Col>
                </Row>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
                    <Col>
                        <Row>
                            <Col xs={12} className="footer-links">
                                <p>
                                    <a href="/" alt="footer link">
                                        Media Center
                                    </a>
                                </p>
                                <p>
                                    <a href="/" alt="footer link">
                                        Privacy
                                    </a>
                                </p>
                                <p>
                                    <a href="/" alt="footer link">
                                        Contact us
                                    </a>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={12} className="footer-links">
                                <p>
                                    <a href="/" alt="footer link">
                                        Investor Relations
                                    </a>
                                </p>
                                <p>
                                    <a href="/" alt="footer link">
                                        Legal Notices
                                    </a>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={12} className="footer-links">
                                <p>
                                    <a href="/" alt="footer link">
                                        Help Center
                                    </a>
                                </p>
                                <p>
                                    <a href="/" alt="footer link">
                                        Jobs
                                    </a>
                                </p>
                                <p>
                                    <a href="/" alt="footer link">
                                        Cookie Preferences
                                    </a>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={12} className="footer-links">
                                <p>
                                    <a href="/" alt="footer link">
                                        Terms of Use
                                    </a>
                                </p>
                                <p>
                                    <a href="/" alt="footer link">
                                        Corporate Information
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
