import { DataSource } from 'typeorm';
import { Deals } from '../entities/deals.entity';

export async function dealsInserter(dataSource: DataSource) {
  const dealsRepo = dataSource.getRepository(Deals);
  const count = await dealsRepo.count();
  if (count > 0) return;
  const deals = [
    {
      name: 'The Marina Torch',
      img: 'the_marina_torch',
      price: 6500000,
      tiket: 60000,
      yield: 9.25,
      sold: 75,
      daysLeft: 150,
    },
    {
      name: 'HHHR Tower',
      img: 'hhhr_tower',
      price: 6500000,
      tiket: 60000,
      yield: 9.25,
      sold: 75,
      daysLeft: 150,
    },
    {
      name: 'Ocean peaks',
      img: 'ocean_peaks',
      price: 6500000,
      tiket: 60000,
      yield: 9.25,
      sold: 75,
      daysLeft: 150,
    },
    {
      name: 'Al Yaqoub Tower',
      img: 'al_yaqoub_tower',
      price: 6500000,
      tiket: 60000,
      yield: 9.25,
      sold: 75,
      daysLeft: 150,
    },
  ];

  await dealsRepo.save(deals);
}
