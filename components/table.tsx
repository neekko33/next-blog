import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from './ui/button'

export default function CrudTable({
  data,
  columns,
}: {
  data: any[]
  columns: { label: string; key: string; render?: (item: any) => React.ReactNode }[]
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          {columns.map(col => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
          <TableHead className="w-[150px]">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <TableRow key={item.id || index}>
              <TableCell className="w-[100px]">{item.id}</TableCell>
              {columns.map(col => (
                <TableCell key={col.key} className={col.width ? `w-${col.width}px` : ''}>
                  {col.render ? col.render(item) : item[col.key]}
                </TableCell>
              ))}
              <TableCell className="w-[150px] space-x-2">
                <Button variant="outline">编辑</Button>
                <Button variant="outline">删除</Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No data available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
