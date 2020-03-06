import { loadConsumerIfExist } from '../../../consumer';
import Network from '../../../extensions/network/network';
import Capsule from '../../../extensions/capsule/capsule';
import { CapsuleOptions } from '../../../extensions/network/orchestrator/types';
import CapsuleList from '../../../extensions/network/capsule-list';
import { PackageManager } from '../../../extensions/package-manager';

export default (async function capsuleIsolate(bitIds: string[], capsuleOptions: CapsuleOptions): Promise<CapsuleList> {
  const consumer = await loadConsumerIfExist();
  if (!consumer) throw new Error('no consumer found');
  const packageManager = new PackageManager('librarian');
  const capsule = await Capsule.provide();
  const network = await Network.provide(undefined, [packageManager, capsule]);
  const subNetwork = await network.createSubNetworkFromConsumer(bitIds, consumer, capsuleOptions);
  return subNetwork.capsules;
});
