import React from 'react';

const Home = () => {

    document.title = 'Home';

    return (
        <>            
            <section id="cover" className="min-vh-100">
                <div id="cover-caption">
                    <div className="container login-container">
                        <div className="row">
                            <div className="col-md-12 login-form-2" style={{float:"none", margin:"auto", textAlign: "justify", color: "white"}}>
                                <h3>Home</h3>
                                SERB has a vision to position science and technology as the fulcrum for social and economic change by supporting competitive, relevant and quality scientific research and development. As the premier national research funding agency, the mission is to raise the quality and footprint of Indian science and engineering to the highest global levels in an accelerated mode, through calibrated, competitive support of research and development.
                                <br/><br/>
                                Although a nascent organization, SERB can trace its existence to the erstwhile Science and Engineering Research Council (SERC), a division of Department of Science & Technology that provided extramural funding for S&T research in India for more than four decades. Creation of SERB, in year 2011, is considered as an important institutional milestone in the Indian S&T ecosystem. Established through an Act of Parliament, SERB is a statutory body with requisite financial and administrative autonomy for performing its mandated functions. Chaired by Secretary, DST, SERB comprises of 17 members that includes seven Secretaries to the Government of India. An Oversight Committee advises and assists the Board.
                                <br/><br/>
                                Whereas SERB is trying to carry forward the rich legacy of SERC serving the cause of extramural research, it is also enriching the structure with the requisite infused ideas and energy, to meet its vision. Since its inception, SERB has contributed towards the nation in developing robust, comprehensive and sophisticated research facilities & infrastructures across the country which is being efficiently utilized by the scientific community of the country in taking the quality of science to the next higher level. SERB has re-organized its processes and systems, made innovative use of technology and automation tools to make them more efficient and enabling and set up tougher benchmarks of performance and delivery during the year. We have also collaborated with our counter parts in several countries to expose Indian Scientists to the latest developments in the field of Science & Technology.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;