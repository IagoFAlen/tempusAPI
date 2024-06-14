const fs = require("fs"); // Manipulação de arquivos
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(                           // Mudar o lugar do arquivo - Promise
            path.resolve(uploadConfig.TMP_FOLDER, file),    // Mudar o lugar do arquivo - Pega o arquivo daqui
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)  // Mudar o lugar do arquivo - E joga aqui
        );
        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    
        try{
            await fs.promises.stat(filePath);
        }catch{
            return;
        }
    
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;