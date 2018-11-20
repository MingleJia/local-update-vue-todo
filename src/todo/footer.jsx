// jsx就是将html代码写在js里面 最终转化成render方法，每个节点都是createElement方法
import '../../assets/styles/footer.styl';
export default {
    data() {
        return {
            author:'Mingle'
        }
    },
    render() {
        // createElement
        return (
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}
