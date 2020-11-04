// LibPagenate

export default {
    init:function(){
        this.per_page = 20;
    },    
    set_per_page:function(num){
        this.per_page = num;
    },    
    get_page_start:function(page){
        var start_num = (page -1) * this.per_page;
        var end_num = (page * this.per_page) -1;
        var ret ={
            start: start_num, end: end_num,
        }        
//        console.log("per_page:",this.per_page)
        return ret;
    },    
    get_per_page:function(){
        console.log("per_page:",this.per_page)
        return this.per_page;
    },
    is_paging_display(count){
        var ret = 0;
        var num = count / this.per_page;
        if(num >= 1){
            ret = 1
        }
        //ret = parseInt( num );
        return ret;

    }    
}