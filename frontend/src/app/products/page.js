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
import PropTypes from 'prop-types';

const pageLabel = 'Products';
const itemsLabels = ['Id','Name','Price','Category','Count',
'Rating','Actions',];

PageContentItems.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            name: PropTypes.string,
            price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            category: PropTypes.string,
            count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        })
    ).isRequired,
    editProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
};

PageActions.propTypes = {
    createProduct: PropTypes.func.isRequired,
};

PageContentActions.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    editProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
};

export default function Products() {
    const [products, setProducts] = useState([]);

    const router = useRouter();

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
        // Definimos a função DENTRO do efeito
        const getProducts = async () => {
            try {
                const jsonData = await getData('products');
                setProducts(jsonData);
            } catch (error) {
                console.error(error.message);
            }
        };

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
            {Array.isArray(products) ? (
                products.map((product) => (
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
                ))
            ): (
                <p>Nenhum produto encontrado ou erro ao carregar.</p>
            )}
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