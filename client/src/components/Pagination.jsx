export default function Pagination({handlePageChange,currentPage,totalPages})
{
return(
    <div>
    <div className='flex items-center justify-between'>
        <button className='flex items-center gap-2' 
        onClick={()=>handlePageChange(currentPage-1)}>
         &lt;&lt;Prev
        </button>
        <button className='flex items-center gap-2 px-4 py-2 border-white'
        onClick={()=>handlePageChange(currentPage+1)} 
        >
         Next&gt;&gt;
        </button>
        </div>
<p className='gray-500 text-center'>Page {currentPage} of totalPages</p>
    </div>
)
}