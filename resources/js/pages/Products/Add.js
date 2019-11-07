import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Input, TextArea} from '../../components/Inputs';
import {useDispatch} from 'react-redux';
import {NewProduct, UpdateProduct} from '../../store/actions/Product';

const Add = (props) => {

    /** Used dispatch component in function component */
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);
    const [loading, setLoading] = useState(false);

    /** Save product and dispatch to reducer */
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setErrorMessage([]);
        setLoading(true);
        let data = new FormData(e.target);
        axios.post('/api/product/store', data)
            .then(response => {
                console.log(response.data);
                setErrorMessage(response.data);
                setLoading(false);
                toastr[response.data.status](response.data.message, "Alert");
                if(response.data.status == 'success'){
                    dispatch(NewProduct(response.data.product));
                    setTimeout(()=>{
                        props.handleClose();
                    }, 500);
                }
            })
            .catch(error => {
                let err = error.response;
                if(err.status == 422){
                    setErrors(err.data.errors);
                }
                else{
                    console.log(err);
                }
                setErrorMessage([]);
                setLoading(false);
            });
    }

    /** Update product and dispatch to reducer */
    const handleUpdate = (e) => {
        e.preventDefault();
        setErrors([]);
        setErrorMessage([]);
        setLoading(true);
        let data = new FormData(e.target);
        axios.post('/api/product/'+props.product.id+'/update', data)
            .then(response => {
                setErrorMessage(response.data);
                setLoading(false);
                toastr[response.data.status](response.data.message, "Alert");
                if(response.data.status == 'success'){
                    dispatch(UpdateProduct(response.data.product));
                    setTimeout(()=>{
                        props.handleClose();
                    }, 500);
                }
            })
            .catch(error => {
                let err = error.response;
                if(err.status == 422){
                    setErrors(err.data.errors);
                }
                else{
                    console.log(err);
                }
                setErrorMessage([]);
                setLoading(false);
            });
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.product==null?'Add New Product':'Update '+props.product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form" onSubmit={props.product==null?handleSubmit:handleUpdate}>
                        {props.product==null?
                            null : <Input type="text" orientation="v" name="slug" title="Product Slug" value={props.product.slug} error={errors.slug} />
                        }
                        <Input type="text" orientation="v" name="title" title="Product Title" value={props.product==null?null:props.product.title} error={errors.title} />
                        <Input type="text" orientation="v" name="price" title="Product Price ($)" value={props.product==null?null:props.product.price} error={errors.price} />
                        <TextArea orientation="v" name="description" title="Product Description" value={props.product==null?null:props.product.description} error={errors.description} />
                        <div className="text-center">
                            {props.product==null?
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (<span><i className='fa fa-spinner fa-spin'></i> Saving</span>) :(<span>Save</span>)}
                                </button>
                                :
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (<span><i className='fa fa-spinner fa-spin'></i> Updating</span>) :(<span>Update</span>)}
                                </button>
                            }
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Add;