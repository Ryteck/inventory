import React, {useCallback, useState} from 'react';
import './style.css';
import NavBar from './../../components/NavBar'
import clond_up from '../../../assets/images/cloud_upload-white-48dp.svg'
import clond_dw from '../../../assets/images/cloud_download-white-48dp.svg'
import {saveAs} from 'file-saver'
import dataManager from "../../../services/dataManager";
import jsonConvert from "../../../helpers/jsonConvert";
import files from "../../../settings/files.json";
import {useDropzone} from 'react-dropzone'
import Redirect from "../../components/Redirect";
import Dialog from "./../../components/Dialog"

interface BackupFileInterface {
    itemsFile: object,
    inputsFile: object,
    outputsFile: object
}

export default () => {
    const [redirectRender, setRedirectRender] = useState<boolean>(false);
    const [redirectPath, setRedirectPath] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>('');
    const [dialogText, setDialogText] = useState<string>('');

    function redirect(path: string) {
        setRedirectPath(path)
        setRedirectRender(true)
    }

    const download = () => {
        const itemsFile = jsonConvert.toJSON(dataManager.read(files[2].path) as string)
        const inputsFile = jsonConvert.toJSON(dataManager.read(files[3].path) as string)
        const outputsFile = jsonConvert.toJSON(dataManager.read(files[4].path) as string)
        const backupFile = {itemsFile, inputsFile, outputsFile}
        const backupString = jsonConvert.toString(backupFile)
        const file = new File([backupString], `inventory-backup-${String(Date.now())}.bue`, {type: "text/plain;charset=utf-8"})
        saveAs(file)
    }

    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader()
        reader.readAsText(acceptedFiles[0])
        reader.onload = function() {
            const {itemsFile, inputsFile, outputsFile} = jsonConvert.toJSON(String(reader.result)) as BackupFileInterface
            dataManager.write(files[2].path, jsonConvert.toString(itemsFile))
            dataManager.write(files[3].path, jsonConvert.toString(inputsFile))
            dataManager.write(files[4].path, jsonConvert.toString(outputsFile))
            setDialogTitle('OK')
            setDialogText('Cadastro realizado com sucesso')
            setDialogOpen(true)
            setTimeout(() => redirect('/home'), 3000)
        };
        reader.onerror = function() {
            setDialogTitle('Error')
            setDialogText(String(reader.error))
            setDialogOpen(true)
        };
    }, []);

    const {getInputProps, open} = useDropzone({
        accept: '.bue',
        onDrop
    });

    return (
        <div className='backup'>
            <header>
                <NavBar backup/>
            </header>
            <div className='space'/>
            <main>
                <div className='box'>
                    <input {...getInputProps()}/>
                    <img src={clond_dw} alt="download" onClick={() => download()}/>
                    <img src={clond_up} alt="upload" onClick={open}/>
                </div>
            </main>
            <Redirect path={redirectPath} render={redirectRender}/>
            <Dialog open={dialogOpen} setOpen={setDialogOpen} title={dialogTitle} text={dialogText}/>
        </div>
    )
}
