'use client';
import React, { useEffect } from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import PageHeader from '../../components/pagetemplate/PageHeader';
import PageContent from '../../components/pagetemplate/PageContent';
import { ControllerTextField } from '../../components/ControllerTextField';
import { getData, postData, putData } from '../../../../middlewares/data';

const pageLabel = 'Edit Product';

export default function Product() {
    const router = useRouter();
    const { id } = useParams();

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmitForm = async () => {

        const name = watch('name');
        const price = watch('price');
        const category = watch('category');
        const count = watch('count');
        const rating = watch('rating');
        const body = { name, price, category, count, rating };

        try {
            if (id === '-1') {
                await postData('products', body);
            } else {
               await putData('products', id, body);
            }
        router.back();
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (id !== undefined && id !== '-1') {
            const fetchData = async () => {
                const data = await getData(`products/${id}`);
                try {
                    setValue('name', data.name);
                    setValue('price', data.price);
                    setValue('category', data.category);
                    setValue('count', data.count);
                    setValue('rating', data.rating);
                } catch (error) {
                    console.error(error.message);
                }
            };
            fetchData();
        }
    }, [id, setValue]);

    return (
        <List>
            <PageHeader pageLabel={pageLabel} />
            <PageContent>
                <ListItem>
                    <Grid>
                        <Card sx={{ p: 2 }}>
                            <form onSubmit={handleSubmit(onSubmitForm)}>
                                <List>
                                    <ControllerTextField
                                        name="name"
                                        label="Name"
                                        control={control}
                                        rules={{ required: true }}
                                        errors={errors.name}
                                    />
                                    <ControllerTextField
                                        name="price"
                                        label="Price"
                                        control={control}
                                        rules={{ required: true }}
                                        errors={errors.price}
                                    />
                                    <ControllerTextField
                                        name="category"
                                        label="Category"
                                        control={control}
                                        rules={{ required: true }}
                                        errors={errors.category}
                                    />
                                    <ControllerTextField
                                        name="count"
                                        label="Count"
                                        control={control}
                                        rules={{ required: true }}
                                        errors={errors.count}
                                    />
                                    <ControllerTextField
                                        name="rating"
                                        label="Rating"
                                        control={control}
                                        rules={{ required: true }}
                                        errors={errors.rating}
                                    />
                                    <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            color="primary"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="contained"
                                            type='submit'
                                            color="secondary"
                                            fullWidth
                                           href='/products/'
                                        >
                                            Cancel
                                        </Button>
                                    </ListItem>
                                </List>
                            </form>
                        </Card>
                    </Grid>
                </ListItem>
            </PageContent>
        </List>
    );
}