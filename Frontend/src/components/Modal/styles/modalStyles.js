const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        maxWidth: '500px',
        backgroundColor: 'white',
        border: '1px solid grey',
        borderRadius: '5px',
        boxShadow:
            '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)',
        padding: '20px',
    },
    header: {
        position: 'relative',
        '& h4': {
            margin: '0',
        },
    },
    closeIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#f9f0f0',
    },
}

export default styles
