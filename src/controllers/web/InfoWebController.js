class InfoWebController {

    getInfo =  async (req, res) => {
        let info = {
            arguments: process.argv.slice(2),
            route: process.cwd(),
            processId: process.pid,
            processTitle: process.title,
            platform: process.platform,
            nodeVersion: process.version,
            memoryUsage: process.memoryUsage()
        }
        res.json(info)
        //res.render('./index/Info', {info: })
    }

}
export default new InfoWebController();
