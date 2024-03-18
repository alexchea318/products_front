import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, DialogContent, TextField} from "@fluentui/react";
import {icons} from "services/consts/icons.js";
import Header from "theme/components/typography/Header.jsx";
import {
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Field
} from "@fluentui/react-components";
import useStateHandler from "theme/hooks/useStateHandler.js";
import TrueGrid from "theme/components/containers/TrueGrid.jsx";
import useFetch from "theme/hooks/useFetch.js";
import {PRODUCTS_API} from "services/api/apiPathes.js";
import {palette} from "theme/Theme.jsx";

const NewProduct = props => {
    const defaultState = {
        name: "",
        description: "",
        price: 100,
    }

    const [state, setStateHandler] = useStateHandler(defaultState)

    function afterSuccess() {
        if (props.listUpd) {
            props.listUpd()
        }
    }
    const [, doPost] = useFetch("POST", `${PRODUCTS_API}/`, {afterSuccess})

    function onSubmit() {
        doPost(null, state)
        setStateHandler(defaultState)
    }

    const isDisabled = !state?.name?.length|| state?.price<1

    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Button>
                    <icons.add  style={{marginRight: 10}}/>
                    Создать
                </Button>
            </DialogTrigger>
            <DialogSurface  style={{background: "#fff"}}>
                <DialogBody>
                    <DialogTitle>
                        <Header h={3} title={"Новый продукт"}/>
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
                        {isDisabled &&
                            <div>
                                <i style={{fontSize: 12, color: palette.gray}}>
                                    Необходимо ввести название и указать цену больше 0
                                </i>
                            </div>
                        }
                        <DialogTrigger disableButtonEnhancement>
                            <Button primary onClick={()=>onSubmit()} disabled={isDisabled}>
                                <icons.add style={{marginRight: 10}}/>
                                Создать
                            </Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

NewProduct.propTypes = {
    listUpd: PropTypes.func.isRequired,
};

export default NewProduct;