import { Controller, HttpStatus } from '@nestjs/common';

@Controller('base')
export class BaseController {
  protected OKResponse = (data: any) => {
		return  {
			code: HttpStatus.OK,
			message: 'success',
			data
		};
	};
}
