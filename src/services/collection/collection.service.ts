import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCollectionArgs } from 'src/book/args/addCollection.args';
import { UpdateCollectionArgs } from 'src/book/args/updateCollection.args';
import { CollectionModel } from 'src/models/collection.model';
import { Repository } from 'typeorm';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionModel)
    private collectionRepository: Repository<CollectionModel>
  ) {}

    async AddCollection(params: AddCollectionArgs) {
      const newCollection = await this.collectionRepository.save(params)
      return 'Collection Added Successfully'
    }

    async UpdateCollection(params: UpdateCollectionArgs) {
      let existingCollection = await this.collectionRepository.findOne({
        where: {
          id: params.id
        }
      })

      if (!existingCollection) {
        throw new HttpException('No Collection Found', HttpStatus.NOT_FOUND);
      }

      existingCollection.status = params.status
      await this.collectionRepository.update(params.id, existingCollection)
      
      return 'Collection Updated Successfully'
    }
  
}
