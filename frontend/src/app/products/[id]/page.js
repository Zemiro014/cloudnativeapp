import React from 'react';
import List from '@mui/material/List';
import PageHeader from '../../components/pagetemplate/PageHeader';
import PageContent from '../../components/pagetemplate/PageContent';

const pageLabel = 'Edit Product';

export default function Product() {
    return (
        <List>
            <PageHeader pageLabel={pageLabel} />
            <PageContent></PageContent>
        </List>
    );
}