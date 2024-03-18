import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "@fluentui/react-components";
import {Link} from "react-router-dom";
import {routes} from "services/router/routes.jsx";
import Header from "theme/components/typography/Header.jsx";
import TCard from "theme/components/overides/TCard.jsx";
import FlexContainer from "theme/components/containers/FlexContainer.jsx";
import TrueGrid from "theme/components/containers/TrueGrid.jsx";
import TTime from "theme/components/typography/TTime.jsx";

const Product = props => {
    const {item} = props
    return (
        <Link  to={`${routes.products.path}/${item?.id}`} className={"hover-border"}>
            <TCard style={{height: "100%"}}>
                <FlexContainer style={{justifyContent: "space-between"}}>
                    <TrueGrid>
                        <Header h={3} title={item?.name}/>
                        <div>
                            <TTime time={item?.created_at}/>
                            {!!item?.description?.length &&
                                <span style={{paddingLeft: 10}}>— {item?.description}</span>
                            }
                        </div>
                    </TrueGrid>
                    <div style={{fontSize: 30}}>
                        {item?.price} ₽
                    </div>
                </FlexContainer>
            </TCard>
        </Link>
    );
};

Product.propTypes = {
    item: PropTypes.object.isRequired
};

export default Product;