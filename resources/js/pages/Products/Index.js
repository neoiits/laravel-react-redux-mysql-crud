import React, {Component} from 'react';
import Add from './Add';
import {connect} from 'react-redux';
import {Row, Col, Table, Button} from 'react-bootstrap';
import {AllProduct, DeleteProduct} from '../../store/actions/Product';

class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : false,
            product : null
        }
        this.loadProducts();
    }

    handleClose(){
        this.setState({
            show : false,
            product : null
        });
    }
/* Load products here from laravel api and dispatch all the records to product reducer */
    loadProducts(){
        axios.get('/api/product/index')
            .then(response => {
                this.props.ProductList(response.data);
            })
            .catch(error => {
                let err = error.response;
                console.log(err);
            });
    }

/* Delete product here from laravel api and dispatch deleted records to product reducer so filter it from reducer */    
    deleteProduct(product){
        if(confirm('Are you sure you want delete this product?')){
            axios.post('/api/product/'+product.id+'/delete',{}).then(response=>{
                toastr[response.data.status](response.data.message, "Alert");
                if(response.data.status == 'success'){
                    this.props.DeleteProduct(response.data.product.id);
                }
            }).catch(response=>{

            });
        }
    }

    render() {
        const {products} = this.props;
        return (
            <>
                <Row className="mt-5">
                    <Col md={12}>
                        <h2 className="text-center">Product List</h2>
                    </Col>
                    <Col md={12}>
                        <div className="text-right">
                            <Button variant="primary" onClick={()=>this.setState({show:true})}>Add Product</Button>
                        </div>
                        {this.state.show?<Add show={this.state.show} product={this.state.product} handleClose={this.handleClose.bind(this)} />:null}
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={12}>
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th width="100" className="text-center">Product Price</th>
                                <th>Description</th>
                                <th width="150" className="text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.length > 0 ? (
                                products.map((product) =>
                                    <tr key={product.id}>
                                        <td>{product.title}</td>
                                        <td className="text-center">${product.price}</td>
                                        <td>{product.description}</td>
                                        <td className="text-center">
                                            <Button variant="primary" className="m-1" onClick={()=>this.setState({show:true, product : product})}>
                                                <span className="fas fa-pen"></span>
                                            </Button>
                                            <Button variant="danger" className="m-1" onClick={this.deleteProduct.bind(this, product)}>
                                                <span className="fas fa-trash"></span>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan={4}> Loading Products...</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </>
        );
    }
}

/* Map all the reducer states to props */
const mapStateToProps = (state) => {
    const {ProductReducer} = state;
    return {
        products : ProductReducer
    }
}

/* Map dispatch actions to props */
const mapDispatchToProps = (dispatch) => {
    return {
        ProductList : (products) => dispatch(AllProduct(products)),
        DeleteProduct : (id) => dispatch(DeleteProduct(id)),
    }
}

/* Connect reducer to component via connect method */
export default connect(mapStateToProps, mapDispatchToProps)(Products);