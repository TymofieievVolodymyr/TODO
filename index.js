import app from './app';

const root = document.getElementById('root');

if (!root) {
    throw new Error('The root element is undefined');
}

app(root);
