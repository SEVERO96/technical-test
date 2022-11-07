import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'

const Employee = () => {
    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }
    //FOr Delete Model
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }


    //Define here local state that store the form Data
    const [articlename, setarticlename] = useState("")
    const [brand, setbrand] = useState("")
    const [model, setmodel] = useState("")
    const [departmentid, setdeparmentid] = useState("")
    const [familyid, setfamilyid] = useState("")
    const [classid, setclassid] = useState("")
    const [stock, setstock] = useState("")
    const [amount, setamount] = useState("")
    const [discontinued, setdiscontinued] = useState("")
    const [createdat, setcreatedat] = useState("")
    const [deletedat, setdeletedat] = useState("")


    const [Delete, setDelete] = useState(false)
    //Id for update record and Delete
    const [sku, setsku] = useState("");
    const GetArticleData = () => {
        //here we will get all employee data
        const url = 'http://localhost:8000/articles'
        axios.get(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            mode: 'cors',
        })
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    setData(data)
                    console.log(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmite = () => {
        const url = 'http://localhost:8000/articles'
        const Credentials = { articlename, brand, model, departmentid, classid, familyid, stock, amount, discontinued, createdat, deletedat }
        axios.post(url, Credentials, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            mode: 'cors',
        })
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleEdit = () => {
        const url = `http://localhost:8000/articles/${sku}`
        const Credentials = { articlename, brand, model, departmentid, classid, familyid, stock, amount, discontinued, createdat, deletedat }
        axios.put(url, Credentials, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            mode: 'cors',
        })
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    //handle Delete Function 
    const handleDelete = () => {
        const url = `http://localhost:8000/articles/${sku}`
        axios.delete(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            mode: 'cors',
        })
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    //call this function in useEffect
    console.log(ViewShow, RowData)
    useEffect(() => {
        GetArticleData();
    }, [])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Alta
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Nombre de articulo</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Departamento</th>
                                <th>Clase</th>
                                <th>Familia</th>
                                <th>Stock</th>
                                <th>Cantidad</th>
                                <th>Descontinuado</th>
                                <th>Fecha Alta</th>
                                <th>Fecha Baja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._sku}>
                                    <td>{item.articlename}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.model}</td>
                                    <td>{item.departmentid}</td>
                                    <td>{item.classid}</td>
                                    <td>{item.familyid}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.discontinued}</td>
                                    <td>{item.createdat}</td>
                                    <td>{item.deletedat}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item)) }}>Ver</Button>|
                                        <Button size='sm' variant='warning' onClick={() => { handleEditShow(SetRowData(item), setsku(item._sku)) }}>Editar</Button>|
                                        <Button size='sm' variant='danger' onClick={() => { handleViewShow(SetRowData(item), setsku(item._sku), setDelete(true)) }}>Eliminar</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* View Modal */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Ver Dato Articulos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.articlename} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.model} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.stock} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.amount} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.createdat} readOnly />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Eliminar articulo</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for submit data to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Alta Articulo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <input type="email" className='form-control' onChange={(e) => setarticlename(e.target.value)} placeholder="por favor, ingrese articulo" />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="text" className='form-control' onChange={(e) => setbrand(e.target.value)} placeholder="por favor, ingrese marca" />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="text" className='form-control' onChange={(e) => setmodel(e.target.value)} placeholder="por favor, ingrese modelo" />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="text" className='form-control' onChange={(e) => setdeparmentid(e.target.value)} placeholder="por favor, ingrese departamento" />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="number" className='form-control' onChange={(e) => setclassid(e.target.value)} placeholder="por favor, ingrese clase" />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="number" className='form-control' onChange={(e) => setfamilyid(e.target.value)} placeholder="por favor, ingrese familia" />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="number" className='form-control' onChange={(e) => setstock(e.target.value)} placeholder="por favor, ingrese stock" />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="number" className='form-control' onChange={(e) => setamount(e.target.value)} placeholder="por favor, ingrese Cantidad" />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="number" className='form-control' onChange={(e) => setdiscontinued(e.target.value)} placeholder="por favor, ingrese estado" />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="date" className='form-control' readOnly />
                        </div>
                        <div className='form-group mt-3'>
                            <input type="date" className='form-control' readOnly />
                        </div>
                        <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Dar de alta articulo</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for Edit employee record */}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Articulo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Nombre del articulo</label>
                                <input type="text" className='form-control' onChange={(e) => setarticlename(e.target.value)} placeholder="Please enter Name" defaultValue={RowData.name} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Marca</label>
                                <input type="email" className='form-control' onChange={(e) => setbrand(e.target.value)} placeholder="Please enter email" defaultValue={RowData.email} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Modelo</label>
                                <input type="text" className='form-control' onChange={(e) => setmodel(e.target.value)} placeholder="Please enter Number" defaultValue={RowData.number} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Departamento</label>
                                <input type="number" className='form-control' onChange={(e) => setdeparmentid(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Clase</label>
                                <input type="number" className='form-control' onChange={(e) => setclassid(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Familia</label>
                                <input type="number" className='form-control' onChange={(e) => setfamilyid(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Stock</label>
                                <input type="number" className='form-control' onChange={(e) => setstock(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Cantidad</label>
                                <input type="number" className='form-control' onChange={(e) => setamount(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>DESCONTINUADO</label>
                                <input type="number" className='form-control' onChange={(e) => setdiscontinued(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Alta Articulo</label>
                                <input type="date" className='form-control' onChange={(e) => setcreatedat(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Baja Articulo</label>
                                <input type="number" className='form-control' onChange={(e) => setdeletedat(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Employee;