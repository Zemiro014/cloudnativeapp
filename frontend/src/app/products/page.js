'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import List from '@mui/material/List';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PageHeader from '../components/pagetemplate/PageHeader';
import PageContent from '../components/pagetemplate/PageContent';
import PageContentLabels from '../components/pagetemplate/PageContentLabels';
import { deleteData, getData } from '../../../middlewares/data';

const pageLabel = 'Products';
const itemsLabels = ['Id','Name','Price','Category','Count',
'Rating','Actions',];

export default function Products() {
    const [products, setProducts] = useState([]);

    const router = useRouter();

    const getProducts = async () => {
        try {
            const jsonData = await getData('products');
            console.log("AQUII: "+jsonData);
            setProducts(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const createProduct = async () => {
        router.push(`/products/-1`);
    };

    const editProduct = async (id) => {
        try {
            router.push(`/products/${id}`);
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await deleteData('products', id);
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        console.log("USE EFFECT. HOST: "+process.env.HOST+" PORT: "+process.env.PORT);
        getProducts();
    }, []);

    return (
        <List>
            <PageHeader pageLabel={pageLabel}>
                <PageActions createProduct={createProduct} />
            </PageHeader>
            <PageContent>
                <PageContentLabels labels={itemsLabels} />
                <PageContentItems 
                    products={products}
                    editProduct={editProduct}
                    deleteProduct={deleteProduct}
                 />
            </PageContent>
        </List>
    );
}

function PageContentItems({ products, editProduct, deleteProduct }) {
    return (
        <TableBody>
            {products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.count}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <PageContentActions
                        id={product.id}
                        editProduct={editProduct}
                        deleteProduct={deleteProduct}
                    />
                </TableRow>
            ))}
        </TableBody>
    );
}

function PageActions({ createProduct }) {
    return (
        <Button
            color="primary"
            variant="contained"
            onClick={() => createProduct()}
        >
            Create
        </Button>
    );
}

function PageContentActions({ id, editProduct, deleteProduct}) {
    return (
        <>
            <TableCell>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => editProduct(id)}
                >
                    Edit
                </Button>
            </TableCell>
            <TableCell>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => deleteProduct(id)}
                >
                    Delete
                </Button>
            </TableCell>
        </>
    );
}