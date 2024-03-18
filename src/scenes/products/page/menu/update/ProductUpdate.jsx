import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import useStateHandler from "theme/hooks/useStateHandler.js";
import useFetch from "theme/hooks/useFetch.js";
import {PRODUCTS_API} from "services/api/apiPathes.js";
import {Dialog, DialogActions, DialogBody, DialogSurface, DialogTitle, DialogTrigger} from "@fluentui/react-components";
import {Button, DialogContent, TextField} from "@fluentui/react";
import {icons} from "services/consts/icons.js";
import Header from "theme/components/typography/Header.jsx";
import TrueGrid from "theme/components/containers/TrueGrid.jsx";
import ProductMenu from "scenes/products/page/menu/ProductMenu.jsx";

const ProductUpdate = props => {
    const {item} = props

    const [state, setStateHandler] = useStateHandler(item)

    function afterSuccess() {
        if (props.getProduct) {
            props.getProduct()
        }
    }
    const [, doUpdate] = useFetch("PUT", `${PRODUCTS_API}/${item?.id}`, {afterSuccess})

    useEffect(() => {
        setStateHandler(item)
    }, [item]);

    function onSubmit() {
        doUpdate(null, state)
    }

    const isDisabled = !state?.name?.length|| state?.price<1

    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Button>
                    <icons.edit  style={{marginRight: 10}}/>
                    Изменить
                </Button>
            </DialogTrigger>
            <DialogSurface  style={{background: "#fff"}}>
                <DialogBody>
                    <DialogTitle>
                        <Header h={3} title={"Редактирование продукта"}/>
                    </DialogTitle>
                    <DialogContent>
                        <TrueGrid>
                            <TextField value={state.name}
                                       onChange={e=>setStateHandler({name: e.target.value})}
                                       label={"Название"}
                                       placeholder={"Новый продукт"}
                            />
                            <TextField value={state.description}
                                       onChange={e=>setStateHandler({description: e.target.value})}
                                       label={"Описание"}
                                       placeholder={"Недавно поступил"}
                            />

                            <TextField value={state.price}
                                       onChange={e=>setStateHandler({price: e.target.valueAsNumber})}
                                       label={"Цена"}
                                       type={"number"}
                                       placeholder={"100"}
                            />
                        </TrueGrid>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger>
                            <Button primary onClick={()=>onSubmit()} disableButtonEnhancement disabled={isDisabled}>
                                <icons.edit style={{marginRight: 10}}/>
                                Изменить
                            </Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

ProductUpdate.propTypes = {
    item: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
};

export default ProductUpdate;